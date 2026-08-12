import Animal from "../models/Animal.js";
import ApiFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAnimals = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Animal.find(), req.query)
    .filter()
    .search(["name", "breed", "category", "description"])
    .sort()
    .paginate();

  const animals = await features.query;
  const totalAnimals = await Animal.countDocuments();

  res.status(200).json({
    success: true,
    count: animals.length,
    total: totalAnimals,
    page: features.page,
    limit: features.limit,
    data: animals,
  });
});

export const getAnimalById = catchAsync(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new AppError(404, "Animal not found."));
  }

  res.status(200).json({
    success: true,
    data: animal,
  });
});

export const createAnimal = catchAsync(async (req, res, next) => {
  const animal = await Animal.create(req.body);

  res.status(201).json({
    success: true,
    message: "Animal created successfully.",
    data: animal,
  });
});

export const updateAnimal = catchAsync(async (req, res, next) => {
  const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!animal) {
    return next(new AppError(404, "Animal not found."));
  }

  res.status(200).json({
    success: true,
    message: "Animal updated successfully.",
    data: animal,
  });
});

export const deleteAnimal = catchAsync(async (req, res, next) => {
  const animal = await Animal.findByIdAndDelete(req.params.id);

  if (!animal) {
    return next(new AppError(404, "Animal not found."));
  }

  res.status(200).json({
    success: true,
    message: "Animal deleted successfully.",
  });
});
