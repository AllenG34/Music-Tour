// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event } = db 
const { Op } = require('sequelize')

events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'date', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        console.log(err)
        res.status(500).send('Error')
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully added a new event',
            data: newEvent
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('Error creating event')
    }
})

events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} events`
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('Error updating event')
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} events`
        })
    } catch(err) {
        console.log(err)
        res.status(500).send('Error deleting event')
    }
})

// EXPORT
module.exports = events