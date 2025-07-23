import { getApiUrl } from "@/config/api";

const API_BASE_URL = getApiUrl();

export interface UserDto {
  id?: number;
  name: string;
  password: string;
  email?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: errorText || `HTTP error! status: ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async login(userData: {
    email: string;
    password: string;
  }): Promise<ApiResponse<UserDto>> {
    return this.request<UserDto>("/User/login", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async register(userData: UserDto): Promise<ApiResponse<UserDto>> {
    return this.request<UserDto>("/User/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async updateUser(
    id: number,
    userData: UserDto
  ): Promise<ApiResponse<UserDto>> {
    return this.request<UserDto>(`/User/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/User/delete?id=${id}`, {
      method: "DELETE",
    });
  }

  async getAllUsers(): Promise<ApiResponse<UserDto[]>> {
    return this.request<UserDto[]>("/User/GetAll", {
      method: "GET",
    });
  }
}

export const apiService = new ApiService(API_BASE_URL);
