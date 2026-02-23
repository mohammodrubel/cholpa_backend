-- CreateTable
CREATE TABLE "advertisement" (
    "id" TEXT NOT NULL,
    "shortTitle_az" TEXT NOT NULL,
    "shortTitle_en" TEXT NOT NULL,
    "title_az" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "advertisement_pkey" PRIMARY KEY ("id")
);
