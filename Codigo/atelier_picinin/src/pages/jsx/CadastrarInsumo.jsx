import '../css/CadastrarInsumo.css'

import { BiTrash } from 'react-icons/bi'
import Tables from '../../components/TableInsumos'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import React from 'react'
import Form from '../../components/FormCadastroInsumos'


const CadastrarInsumo = () => {
    const [message, setMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const [insumo, setInsumo] = useState({})
    const [form, setForm] = useState('')

    function deleteInventory(e){
        e.preventDefault()
        idTrClicada(e)
        
        fetch(`http://localhost:3000/api/deleteInventory?id=${element.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setInsumos(insumos.filter((insumo) => insumo.id !== id))
            setMessage("Insumo removido com sucesso!")
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        setForm(<Form id="form"
                    action="http://localhost:3000/api/inventoryResgister"
                    method="post"
                    btnText="Cadastrar"
                    classNameButton="btnCadastrar"
                    insumo={ insumo && (insumo) }
                    onSubmitEvent={handleSubmit && (handleSubmit)}
                />
        )

    },[insumo])

    useEffect(() => {
        fetch('http://localhost:3000/api/viewAllInventory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setInsumos(data))
        .catch(err => console.error(err))
    })

    function idTrClicada(e) {
        const tr = e.target
        var element = tr.parentNode
        while(element.id == false)
            element = element.parentNode

        return element.id
    }

    function handleEditInventory(e){
        const id = idTrClicada(e)

        if(insumo)
            setInsumo(insumos.find(insumo => insumo._id === id))
    }

    function handleSubmit(e){
        e.preventDefault()
        setMessage("Insumo cadastrado com sucesso!")
    }
    
    return (
        <div className="body">
            <div className="titleButton">
                <h1 className="title">Cadastro de Insumos</h1>

                { message && ( <p>{message}</p> ) }

                <Button type="button" text="Inserir Novo Insumo" data_bs_toggle="modal" data_bs_target="#modalCadastro" className="btnAdd"/>
            </div>

            <Modal id="modalCadastro" title="Cadastrar novo Insumo" content={form}/>

            <Modal id="modalEdit" title="Alterar Dados do Insumo" content={form}/>

            <Tables 
                itens={insumos}
                idModal="#modalEdit"
                clickEvent={handleEditInventory}
                form={form}
                textButton={
                    <Button type="button" text={<BiTrash />}
                        className="btnLixeira"
                        event={deleteInventory}
                    />
                }
            />
        </div>
    )
}
export default CadastrarInsumo