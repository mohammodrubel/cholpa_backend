import { Recipe } from "@prisma/client"
import prisma from "../../utils/prisma"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import calculatePagination from "../../utils/pagination";
import { productSearchFields } from "./Recipe.constant";

type RecipeInput = Partial<Recipe> & {
  ingredients?: { en: string; az: string }[];
  tips?: { en: string; az: string }[];
};

const createRecipe = async (file: Express.Multer.File, data: RecipeInput) => {
  const errors: string[] = [];

  if (!file) throw new AppError(httpStatus.BAD_REQUEST, 'Recipe image is required');
  if (!data.name_en?.trim()) errors.push("name_en is required");
  if (!data.name_az?.trim()) errors.push("name_az is required");
  if (!data.description_en?.trim()) errors.push("description_en is required");
  if (!data.description_az?.trim()) errors.push("description_az is required");
  if (!data.details_en?.trim()) errors.push("details_en is required");
  if (!data.details_az?.trim()) errors.push("details_az is required");

  if (errors.length > 0) throw new AppError(httpStatus.BAD_REQUEST, errors.join(", "));

  const uniqueImageName = `banner_${Date.now()}_${Math.random().toString(36)}`;
  const uploadedImage = await sendImageToCloudinary(file.path, uniqueImageName) as { secure_url: string };

  const recipe = await prisma.recipe.create({
    data: {
      imageUrl: uploadedImage.secure_url,
      name_en: data.name_en!,
      name_az: data.name_az!,
      description_en: data.description_en!,
      description_az: data.description_az!,
      details_en: data.details_en!,
      details_az: data.details_az!,
      category_en: data.category_en,
      category_az: data.category_az,
      minute: Number(data.minute) || 0,
      chefName_en: data.chefName_en,
      chefName_az: data.chefName_az,
      videoTitle_en: data.videoTitle_en,
      videoTitle_az: data.videoTitle_az,
      videoDescription_en: data.videoDescription_en,
      videoDescription_az: data.videoDescription_az,
      videoUrl: data.videoUrl,
    },
  });

  if (data.ingredients?.length) {
    await prisma.ingredient.createMany({
      data: data.ingredients.map((i) => ({
        value_en: i.en,
        value_az: i.az,
        recipeId: recipe.id
      }))
    });
  }

  if (data.tips?.length) {
    await prisma.tip.createMany({
      data: data.tips.map((t) => ({
        value_en: t.en,
        value_az: t.az,
        recipeId: recipe.id
      }))
    });
  }

  return recipe
};

const getAllRecipe = async (query: any, options: any) => {
  const { searchTerm, ...filter } = query;

  const { limit, page, skip, sort, order } = calculatePagination(options);

  const andCondition: any[] = [];

  // 🔎 Search by name/description
  if (searchTerm) {
    andCondition.push({
      OR: ["name_en", "name_az", "description_en", "description_az"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // 🎯 Dynamic filters (ignore empty or null values)
  Object.keys(filter).forEach((field) => {
    const value = filter[field];

    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return; // skip empty filters
    }

    if (Array.isArray(value)) {
      andCondition.push({
        [field]: { in: value },
      });
    } else {
      andCondition.push({
        [field]: { equals: value },
      });
    }
  });

  const whereCondition = andCondition.length ? { AND: andCondition } : {};

  // ✅ Only allow valid Prisma fields for sorting
  const validSortFields = [
    "id",
    "name_en",
    "name_az",
    "description_en",
    "description_az",
    "details_en",
    "details_az",
    "category_en",
    "category_az",
    "minute",
    "chefName_en",
    "chefName_az",
    "imageUrl",
    "videoTitle_en",
    "videoTitle_az",
    "videoDescription_en",
    "videoDescription_az",
    "videoUrl",
    "createdAt",
    "updatedAt",
  ];

  const sortField = validSortFields.includes(sort) ? sort : "createdAt";
  const sortOrder = order === "asc" ? "asc" : "desc";

  const result = await prisma.recipe.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortField]: sortOrder, // ✅ use camelCase
    },
    include: {
      ingredients: true,
      tips: true,
    },
  });

  const total = await prisma.recipe.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleRecipe = async () => { }
const updateRecipe = async () => { }
const deleteRecipe = async (id: string) => {
  const isValidRecipe = await prisma.recipe.findUnique(
    {
      where: {
        id: id
      }
    }
  )
  if (!isValidRecipe) {
    throw new AppError(httpStatus.NOT_FOUND, "invalid recipe")
  }

  const reuslt = await prisma.recipe.delete(
    {
      where: {
        id: isValidRecipe.id
      }
    }
  )
  return reuslt
}

export const RecipeService = {
  createRecipe,
  getAllRecipe,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe
}
