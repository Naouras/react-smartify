import { getData } from './HttpUtil';

export function search(query, type) {
  return getData('/v1/search?q=' + query + '&type=' + type);
}

export function getArtist(artist_id) {
  return getData('/v1/artists/' + artist_id);
}

export function getAlbumsByArtist(artist_id) {
  return getData('/v1/artists/' + artist_id + '/albums');
}

export function getSongsByAlbum(album_id) {
  return getData('/v1/albums/' + album_id);
}
