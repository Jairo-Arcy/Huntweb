import React, {Component} from 'react'
import api from '../../services/api'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './styles.css'



const deleteAlert = withReactContent(Swal)

export default class Product extends Component {
  state = { 
    product: {}, 
  }

  async componentDidMount() {
    const { id } = this.props.match.params

    const response = await api.get(`/products/${id}`)

    this.setState({
      product: response.data
    })

  }


  deleteProduct = async() => {
    const { id } = this.props.match.params

    const data = await api.delete(`/products/${id}`)
}

isDeleted = () => {
  deleteAlert.fire({
    title: 'Deletar o produto',
    text: "Tem certeza que deseja deletar este produto ?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
    if (result.value) {
      this.deleteProduct()
      deleteAlert.fire(
        'Deletado',
        'Seu produto foi deletado com sucesso.',
        'success'
      ).then((result) => {
        if(result.value){
          window.location.href = '../'
        }

      })
    }
      })
}

editProduct = async() => {
  const { id } = this.props.match.params
  const lblTitle = document.querySelector('.title-edit')
  const lblDesc = document.querySelector('.desc-edit')
  const lblUrl = document.querySelector('.url-edit')

  const data = await api.put(`/products/${id}`, {
    title: lblTitle.value,
    description: lblDesc.value, 
    url: lblUrl.value

  })
}
  isEdited = () =>{
    
    deleteAlert.fire({
      title: 'Editar o produto',
      html: `<input id="swal-input1" placeholder="Titulo:" type="text" class="title-edit">` + 
            `<input id="swal-input2" placeholder="Descrição:" type="text" class="desc-edit">` + 
            `<input id="swal-input3" placeholder="Url:" type="text" class="url-edit">`, 
      focusConfirm: false, 
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.editProduct()
        deleteAlert.fire(
          'Editado',
          'Seu produto foi editado com sucesso.',
          'success'
        ).then((result) => {
          if(result.value){
            window.location.href = '../'
          }
  
        })
      }
        })

  }

  render() {
    const {product} = this.state



    return (
      <div className="product-info">
        <h1>{product.title}</h1>
        <DeleteIcon onClick={this.isDeleted} className='delete-icon' title='Deletar Produto.'/>
        <EditIcon onClick={this.isEdited} className='edit-icon' title='Editar Produto.'/>
        <p>{product.description}</p>

        <p>
           URL: <a target='_blank' href={product.url}>{product.url}</a>
        </p>

      </div>

    )
  }

}