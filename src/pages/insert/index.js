import React, {Component} from 'react'
import api from '../../services/api'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import {Link} from 'react-router-dom'

import './styles.css'

const SuccessAlert = withReactContent(Swal)
const ErrorAlert = withReactContent(Swal)
export default class Main extends Component{
  componentDidMount() {


  }

  addProducts = async() => {
    const lblTitle = document.querySelector('input#lblTitle')
    const lblDescription = document.querySelector('input#lblDescription')
    const lblUrl = document.querySelector('input#lblUrl')
    const data = await api.post('/products', {
      title: lblTitle.value,
      description: lblDescription.value,
      url: lblUrl.value,
    })
  }
  add = () => {
    SuccessAlert.fire({
      title: 'Adicionar o produto',
      text: "Tem certeza que deseja adicionar este produto ?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.addProducts()
        SuccessAlert.fire(
          'Adicionado!',
          'Seu produto foi adicionado com sucesso.',
          'success'
        ).then((result) => {
          if(result.value){
            window.location.href = '../'
          }

        })
       
      }
    })

  }

  isSubmit = () => {
    const lblTitle = document.querySelector('input#lblTitle')
    const lblDescription = document.querySelector('input#lblDescription')
    const lblUrl = document.querySelector('input#lblUrl')

    const ErrorToast = ErrorAlert.mixin ({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }

    })

    if(lblTitle.value === '' || lblDescription.value === '' || lblUrl.value === ''){
        ErrorToast.fire({icon: 'error', title: 'Prencha o campo para cadastrar.'})
    }else{
      this.add()
    }
  }

  render() {
    return (
      <div className="card" >
        <label for="lblTitle">Titulo:</label>
        <input id="lblTitle" required/>
        <label for="lblDescription">Descrição:</label>
        <input id="lblDescription" required/>
        <label id="txtUrl" for="lblUrl">URL:</label>
        <input id="lblUrl" required/>

        <div id="btnSend" className="add-product"><button onClick={this.isSubmit}>OK</button></div>
        
      </div>


    )

  }



}