
import React, { useEffect, useState } from 'react'
import DataTable from './../../../Components/AdminPanel/DataTable/DataTable'
import {swal} from 'sweetalert'
import { useForm } from "./../../../hooks/useForm";
export default function Articles() {

  const [articles, setArticles] = useState([])
  function getAllArticle (){
    fetch('http://localhost:5000/v1/articles')
      .then(res => res.json())
      .then(allArticles => {
        console.log(allArticles);
        setArticles(allArticles)
      })
      const [formState, onInputHandler] = useForm(
        {
          title: {
            value: "",
            isValid: false,
          },
          shortName: {
            value: "",
            isValid: false,
          },
          description: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    
  }
  const removeArticle = (articleID)=>{
    const localStorageData = localStorage.getItem('user')
    swal({
      title:'مظمنی ',
      icon:'warning',
      buttons:['نه','اره']
    }).then((res)=>{
      if (res){
        fetch(`http://localhost:5000/v1/article/${articleID}`,{
          method:'DELETE',
          headers:{
            'Authorization':`Bearer${localStorageData.token} `
          }
        }).then(res=>{
          if (res.ok){
            swal({
              title:'حذف شد',
              icon:'success',
              buttons:'ok'
            }).then(()=>{
              getAllArticle()
              
            })
          }
        })
      }

    })
    
    
  }

  useEffect(() => {
    getAllArticle()
    
  }, [])

  return (
    <>
    <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="مقاله‌ها"
      >
         <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn" 
                    onClick={()=> removeArticle(article._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
