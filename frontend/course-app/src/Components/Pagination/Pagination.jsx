import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import "./Pagination.css";
import { useParams } from "react-router";

export default function Pagination({ items, itemCount, pathName, setShownCourses }) {
  const { page } = useParams()
  const [pagesCount, setPagesCount] = useState(null)
  useEffect(() => {
    let endIndex = itemCount * page
    let startIndex = endIndex - itemCount
    let paginatedItem = items.slice(startIndex, endIndex)
    setShownCourses(paginatedItem)
    let pageNumber = Math.ceil(items.lenght / itemCount)
    setPagesCount(pageNumber)

  }, [page])
  return (
    <div class="courses-pagination">
      <ul class="courses__pagination-list">

        {Array(pagesCount).fill(0).map((item, index) => (
          <li class="courses__pagination-item">
            {
              index + 1 === Number(page) ? (<Link to={`${pathName}/${index+1}`} class="courses__pagination-link active">{index + 1}
                <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
              </Link>) : (<Link to={`${pathName}/${index+1}`} class="courses__pagination-link">{index + 1}
                <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
              </Link>)
            }

          </li>
        ))}
      </ul>
    </div>
  );
}
