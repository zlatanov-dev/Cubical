const Cube = require("../models/Cube");
const Accessorry = require("../models/Accessory");
const cubeService = require("../services/cubeService");
const cubeUtils = require("../utils/cubeUtils");

exports.getCreateCube = (req, res) => {
  res.render("cube/create");
};

exports.postCreateCube = async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  try {
    let cube = new Cube({ name, description, imageUrl, difficultyLevel, owner: req.user._id });

    await cube.save();
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    return res.redirect("/404");
  }
};

exports.getDetails = async (req, res) => {
  try {
    const cube = await Cube.findById(req.params.cubeId)
      .populate("accessories")
      .lean();

    if (!cube) {
      throw new Error("Invalid cube id!");
    }
    const isOwner = cube.cubeUtils.isOwner(req.user, cube);
    res.render(`cube/details`, { cube, isOwner });
  } catch (err) {
    return res.redirect("/404");
  }
};

exports.getAttachAccessory = async (req, res) => {
  const cube = await Cube.findById(req.params.cubeId).lean();
  const accessories = await Accessorry.find({
    _id: { $nin: cube.accessories },
  }).lean();
  res.render("cube/attach", { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
  const cube = await Cube.findById(req.params.cubeId);
  const accessoryId = req.body.accessory;
  cube.accessories.push(accessoryId);
  await cube.save();
  res.redirect(`/cubes/${cube._id}/details`);
};

exports.getEditCube = async (req, res) => {
  const cube = await cubeService.getOne(req.params.cubeId);
  const difficultyLevel = cubeUtils.generateDificultyLevels(
    cube.difficultyLevel
  );
  if(!cubeUtils.isOwner(req.user, cube)) {
    return res.redirect("/404");
  }
  res.render("cube/edit", { cube, difficultyLevel });
};

exports.postEditCube = async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeService.update(req.params.cubeId, {
    name,
    description,
    imageUrl,
    difficultyLevel,
  });
  res.redirect(`/cubes/${req.params.cubeId}/details`);
};

exports.getDeleteCube = async (req, res) => {
  const cube = await cubeService.getOne(req.params.cubeId);
  const difficultyLevel = cubeUtils.generateDificultyLevels(
    cube.difficultyLevel
  );

  res.render("cube/delete", { cube, difficultyLevel });
};

exports.postDeleteCube = async (req, res) => {
  await cubeService.delete(req.params.cubeId);
  res.redirect("/");
};
