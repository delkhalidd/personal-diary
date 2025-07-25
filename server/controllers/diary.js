
const Diary = require('../models/Diary');

const index = async (req, res) => {
  try {
    const diaryEntries = await Diary.getAll();
    res.status(200).send({ data: diaryEntries });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const diaryId = parseInt(req.params.id);
    const selectedDiary = await Diary.findById(diaryId);
    res.status(200).send({ data: selectedDiary });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const newDiary = await Diary.create(data);
    res.status(201).send({ data: newDiary });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const diaryToUpdate = await Diary.findById(parseInt(req.params.id));
    req.body.title ||= diaryToUpdate.title;
    req.body.content ||= diaryToUpdate.content;
    req.body.date ||= diaryToUpdate.date;
    const updatedDiary = await diaryToUpdate.update(req.body);
    res.status(200).send({ data: updatedDiary });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const diary = await Diary.findById(parseInt(id));
    await diary.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = { index, show, create, update, destroy };
