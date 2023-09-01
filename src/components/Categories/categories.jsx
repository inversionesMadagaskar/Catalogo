import { categories } from '../../data'
import CategoryItem from '../CategoriesItem/categoriesItem.jsx'
import './Categories.css'

const Categories = () => {
  return (
    <div className='blockCats'>
      <h1 className='titleCats'>CATEGORIAS</h1>
      <div className='Cats'>
          {categories.map(item =>(
            <CategoryItem item={item} key={item.id}/>
          ))}
      </div>
    </div>
  )
}

export default Categories