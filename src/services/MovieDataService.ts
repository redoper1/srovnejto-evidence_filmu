import http from "../http-common";

class MovieDataService {
  getAll(params = {}): Promise<any> {
    return http.get("/movies", { params: params });
  }

  get(id: any): Promise<any> {
    return http.get(`/movies/${id}`);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/movies/${id}`, data);
  }
}

export default new MovieDataService();
