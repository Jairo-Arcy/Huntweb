import React, {Component} from 'react'
import AddIcon from '@material-ui/icons/Add'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import api from '../../services/api'
import {Link} from 'react-router-dom'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './styles.css'

const deleteAlert = withReactContent(Swal)

export default class Main extends Component{
  state = {
    products: [],
    productInfo: {}, 
    page: 1,
    total: 0,
    pagesTotal: 1,
  }

  componentDidMount() {
    this.loadProducts()
  }

  loadProducts = async(page = 1) => {
    const response = await api.get(`/products?page=${page}`)

    const {docs, ...productInfo} = response.data

    this.setState({
      products: docs,
      productInfo,
      page,
      total: response.data.total,
      pagesTotal: response.data.pages,
    })

  }

  prevPage = () => {
    const {page, productInfo} = this.state

    if(page === 1) return; 

    const pageNumber = page - 1 

    this.loadProducts(pageNumber)

  }

  nextPage = () => {
      const {page, productInfo} = this.state

      if(page === productInfo.pages) return; 
        
      
      
      const pageNumber = page + 1


        this.loadProducts(pageNumber)
  }



  render(){
    const {products, page, productInfo, total, pagesTotal} = this.state
    return (
      <div className="product-list">
        <div className="add-product">
              <Link to={'insert/'}>Adicionar Produto <AddIcon className='add-icon'/></Link>
        </div>
        <p className="product-total">Produtos Cadastrados: {total}</p>
        {this.state.products.map(product => 
        <article key={product._id}> 
          <strong>{product.title}</strong>
         
         
          <p>{product.description}</p>
          <Link to={`/products/${product._id}`}>Acessar < ArrowForwardIcon className='arrow-icon'/> </Link>
        </article> )}

        <div className="pages-number">
          <p>{page}/{pagesTotal}</p>
        </div>

        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages } onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    )
  }

}