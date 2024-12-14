import { Router } from "express";
import sequelize from "../database/connection.js";



    const router = Router();
    
    router.get('/', async (req, res) => {
        try {
            const Agendamento  = sequelize.Agendamento;
            const agendamentos = await Agendamento.findAll();
            return res.status(200).json(agendamentos);
        } catch (error) {
            console.error(`Erro ao listar agendamentos: ${error.stack}`);
            return res.status(500).json({ error: 'Ocorreu um erro interno. Estamos trabalhando para resolver !' });
        }
    })

    router.get('/:id', async (req,res) => {
        const { id } = req.params;
        const Agendamento = sequelize.Agendamento;
        const getAgend = await Agendamento.findByPk(id);
        return res.json(getAgend);
    })

    router.post('/', async (req, res) => {

        const data = req.body;
        const Agendamento = sequelize.Agendamento;

        try {
            await Agendamento.create(data);
            return res.status(201).json({ message: 'Agendamento criado com sucesso' });

        } catch (error) {
            console.error(`Erro ao agendar: ${error.stack}`);
            return res.status(500).json({message:`Ocorreu um erro no agendamento: ${error}`});    
        }
    })

    router.put('/:id', async (req, res) => {

        const { id } = req.params;
        const data = req.body;
        const Agendamento = sequelize.Agendamento;

        try {
            const getAgend = await Agendamento.findByPk(id);

            if (getAgend) {
                getAgend.update(data);
                return res.status(200).json({message: "Agendamento atualizado !"})
            } else {
                return res.status(404).json({message: "Agendamento não encontrado em nosso banco de dados!"})
            }
        } catch (error) {
            
        }
        
    })

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        const Agendamento = sequelize.Agendamento;
        try {
            const getAgend = await Agendamento.findByPk(id)
            if (getAgend) {
                getAgend.destroy();
                return res.status(204).send();
            } else {
                return res.status(404).json({message: "Não foi possível excluir. Usuário não encontrado !"})
            }
        } catch (error) {
            console.error(`Erro interno na exclusão: ${error.stack}`);
            return res.status(500).json({message: "Ocorreu um erro interno, tente mais tarde!"})
        }
    })

export default router