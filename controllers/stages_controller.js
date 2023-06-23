// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db 
const { Op } = require('sequelize')

stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        console.log(err)
        res.status(500).send('Error getting stages')
    }
})

stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        console.log(err)
        res.status(500).send('Error getting one stage')
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully added a new stage',
            data: newStage
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('Error creating band')
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stages`
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('Error updating stages')
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stages`
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('Error deleting stages')
    }
})

// EXPORT
module.exports = stages