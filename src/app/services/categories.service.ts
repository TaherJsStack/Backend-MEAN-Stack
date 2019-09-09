import { HttpClient } from '@angular/common/http';
import { CategoryModule } from './../modules/category.module';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const BACKEND_API = environment.API_URL + '/categories/';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories:               CategoryModule[] = [];
  categoriesUpdated   = new Subject<{categories: CategoryModule[], cateCount: number}>();
  categoriesEditIndex = new Subject<number>();

  constructor(private http: HttpClient) { }

  // get All Categories
  getAllCates(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // console.log('queryParams =>', queryParams);
    this.http.get<{ message: string; categories: any; maxPosts: number }>(
      BACKEND_API  + queryParams
      )
    .pipe(
      map(  categoryData => {
        return { caregories: categoryData.categories.map( category => {
          return {
            id:          category._id,
            name:        category.name,
            showCategory: category.showCategory,
            creatorId:   category.creatorId,
            creatorName: category.creatorName,
            description: category.description,
            addedDate:   category.addedDate,
          };
        }),
        maxPost: categoryData.maxPosts
      };
      })
    )
    .subscribe( transformedCategoryData => {
      this.categories = transformedCategoryData.caregories;
      this.categoriesUpdated.next({
        categories: [...this.categories],
        cateCount: transformedCategoryData.maxPost
        });
    });
  }

  // get All Categories On Update
  getAllCatesUpdatedListener() {
  }

  // get only one category
  getCate(categoryId) {

  }

  // add and save new  Category
  addCate( cateData: CategoryModule ) {
    return this.http.post<{ }>( );
  }

  //  after updates to save
  updateCate(categoryId: string, newCategoryData) {
    return this.http.put<{category: string, message: string}>( BACKEND_API + categoryId, newCategoryData );
  }

  updateCateSatu(categoryId: string, showCategory) {
    return this.http.put<{message: string}>( BACKEND_API + '/state/' + categoryId, showCategory );
  }


// // delete category by id
  deleteCate(categoryId: string)  {
    return this.http.delete<{message: string}>( );
  }

}
