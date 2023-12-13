const Project = require('../models/project');
const { cloudinary } = require("../cloudinary");



module.exports.index = async (req, res) => {
    const projects = await Project.find({}).populate('popupText');
    res.render('project/index', { projects })
}

module.exports.renderNewForm = (req, res) => {
    res.render('project/new');
}

module.exports.createProject = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.project.location,
        limit: 1
    }).send()
    const project = new Project(req.body.project);
    project.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await project.save();
    console.log(project);
    req.flash('success', 'Successfully made a new project!');
    res.redirect(`/projects/${project._id}`)
}

module.exports.showProject = async (req, res,) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        req.flash('error', 'Cannot find that project!');
        return res.redirect('/projects');
    }
    res.render('projects/show', { project });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id)
    if (!project) {
        req.flash('error', 'Cannot find that project!');
        return res.redirect('/projects');
    }
    res.render('projects/edit', { project });
}

module.exports.updateProject = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const project = await Project.findByIdAndUpdate(id, { ...req.body.project });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    project.images.push(...imgs);
    await project.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await project.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated project!');
    res.redirect(`/projects/${project._id}`)
}

module.exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted project')
    res.redirect('/projects');
}