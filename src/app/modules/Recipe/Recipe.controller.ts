import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { RecipeService } from "./Recipe.service"
import AppError from "../../errors/AppError"
import pick from "../../utils/PickFunction"
import { paginationFields, productSearchFields } from "./Recipe.constant"

const createRecipe = catchAsync(async (req, res) => {
    const file = req.file as Express.Multer.File;
    if (!file) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Recipe image is required');
    }
    const result = await RecipeService.createRecipe(file, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Create New Recipe Successfully",
        data: result
    })
})

const getAllRecipe = catchAsync(async (req, res) => {
  const filter = pick(req.query, productSearchFields); // now only valid columns
  const options = pick(req.query, paginationFields);
  const result = await RecipeService.getAllRecipe(filter, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All recipes shown successfully',
    meta: result?.meta,
    data: result.data,
  });
});
const getSingleRecipe = catchAsync(async (req, res) => { })
const updateRecipe = catchAsync(async (req, res) => { })
const deleteRecipe = catchAsync(async (req, res) => {
    const recipeId = req.params.id
    const reuslt = await RecipeService.deleteRecipe(recipeId)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"recipe remove successfully",
        data:reuslt
    })
})
export const RecipeController = {
    createRecipe,
    getAllRecipe,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe
}