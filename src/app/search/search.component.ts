import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchForm: FormGroup;

  pageCount: number = 0;
  moviesCount: number = 0;

  genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

  fromDate: string;
  toDate: string;
  language: string;
  genre: string;

  movieIds: number[][] = [];
  movies:any[] = [];

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      dateRange: new FormControl(null, Validators.required),
      language: new FormControl(''),
      genre: new FormControl('')
    });

    this.searchForm.valueChanges.subscribe((response) => {
      this.fromDate = new Date(response.dateRange[0]).toISOString().slice(0, 10);
      this.toDate = new Date(response.dateRange[1]).toISOString().slice(0, 10);

      this.language = response.language;
      this.genre = response.genre;

      this.searchService.discoverMovies(this.fromDate, this.toDate, this.language, this.genre).subscribe((response) => {
        this.pageCount = response.pageCount;
        this.moviesCount = response.moviesCount;
      });
    });

    this.getAllMoviesInfo();
    
  }

  getAllMoviesInfo() {
    this.clearValues();
    this.searchService.getmovieIds(this.pageCount,this.fromDate, this.toDate).subscribe((movieIds: number[]) => {
      this.splitMovieIdsIntoChunks(movieIds);
      this.getMoviesData();
    });
  }

  splitMovieIdsIntoChunks(movieIds: number[]) {
    const chunkSize = 100;
    for (let i = 0; i < movieIds.length; i += chunkSize) {
      const chunk = movieIds.slice(i, i + chunkSize);
      this.movieIds.push(chunk);
    }
  }

   async getMoviesData() {
    this.movieIds.forEach(async(movieIds) => {
      const moviesData = await this.searchService.getMovieDetails(movieIds);
      this.movies.push(moviesData);
      this.movies = this.movies.flat();
      this.exportToExcel();
    });
  }

  clearValues() {
    this.movieIds.length = 0;
    this.movies.length = 0;
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.movies);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'movies_data');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = fileName + '.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

}
