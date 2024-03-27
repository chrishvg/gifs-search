import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifsList: Gif[] = []

  private _tagsHistory: string[] = []
  private apiKey: string = '6OAmf5oEOj674b5sMSH46sf8hoh7ZokF'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient ) {
    this.loadLocalStorage()
  }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeTags(tag: string) {
    tag = tag.toLocaleLowerCase()

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldtag => oldtag !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this.tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void {
    if (!localStorage.getItem('history')) return

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!) as string[]
    if( this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }

  searchTag(tag: string) {
    if (tag.length === 0) return
    this.organizeTags(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','12')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
      this.gifsList = resp.data
    })
  }
}
