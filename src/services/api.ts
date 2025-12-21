// API Service Layer - Centralized backend communication
const API_BASE_URL = 'http://localhost:8000';

// ==================== TYPES ====================

export interface SearchResult {
  id: string | number; // Support both UUID strings and numeric IDs
  title: string;
  type: string;
  city?: string;
  rating?: number;
  pricePerNight?: number;
  totalPrice?: number;
  nbNuit?: number;
  nbLit?: number;
  nbChambre?: number;
  distance?: number;
  distancce?: number;
  images?: string[];
  favorite?: boolean;
  geolocation?: {
    lat: number;
    long: number;
  };
  [key: string]: any;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  search_results?: SearchResult[] | null;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessage[];
}

export interface ConversationalSearchResponse {
  needs_more_info: boolean;
  assistant_message: string;
  search_results: SearchResult[] | null;
  missing_fields?: string[];
  collected_info?: Record<string, any>;
}

export interface CreateChatRequest {
  user_id: string;
  title?: string;
  initial_message?: string;
}

// ==================== AUTH TYPES ====================
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

// ==================== PROMPT ENHANCE ====================
export interface PromptEnhanceResponse {
  enhanced_prompt: string;
  used_model: string;
}

export interface AssistantResponse {
  reply: string;
  used_model: string;
}

export interface TranscribeResponse {
  transcript: string;
  used_model: string;
}

// ==================== API FUNCTIONS ====================

class ApiService {
  private async fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // ==================== CHAT ENDPOINTS ====================

  async createChat(data: CreateChatRequest): Promise<{ chat: Chat; message: string }> {
    return this.fetchApi('/chats/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserChats(userId: string): Promise<{ chats: Chat[]; total: number; user_id: string }> {
    return this.fetchApi(`/chats/user/${userId}`, {
      method: 'GET',
    });
  }

  async getChat(chatId: string): Promise<{ chat: Chat; message: string }> {
    return this.fetchApi(`/chats/${chatId}`, {
      method: 'GET',
    });
  }

  async addMessage(chatId: string, role: 'user' | 'assistant', content: string, searchResults?: SearchResult[]): Promise<any> {
    return this.fetchApi(`/chats/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId,
        role,
        content,
        search_results: searchResults || null,
      }),
    });
  }

  async deleteChat(chatId: string): Promise<{ message: string; chat_id: string }> {
    return this.fetchApi(`/chats/${chatId}`, {
      method: 'DELETE',
    });
  }

  async updateChatTitle(chatId: string, title: string): Promise<any> {
    return this.fetchApi(`/chats/${chatId}/title?title=${encodeURIComponent(title)}`, {
      method: 'PATCH',
    });
  }

  // ==================== CONVERSATIONAL SEARCH ====================

  async conversationalSearch(chatId: string, userMessage: string): Promise<ConversationalSearchResponse> {
    return this.fetchApi('/chats/conversational-search', {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId,
        user_message: userMessage,
      }),
    });
  }

  // ==================== SEARCH ENDPOINTS ====================

  async searchHotels(query: string, maxResults: number = 20): Promise<{ hotels: SearchResult[]; total: number; query: string }> {
    return this.fetchApi('/search/hotels', {
      method: 'POST',
      body: JSON.stringify({
        query,
        max_results: maxResults,
      }),
    });
  }

  async search(query: string, maxResults: number = 20): Promise<any> {
    return this.fetchApi('/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
        max_results: maxResults,
      }),
    });
  }

  // ==================== HEALTH CHECK ====================

  async healthCheck(): Promise<{ status: string; gemini_configured: boolean }> {
    return this.fetchApi('/health', {
      method: 'GET',
    });
  }

  // ==================== AUTH ====================

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return this.fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    return this.fetchApi('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  async me(accessToken: string): Promise<AuthUser> {
    return this.fetchApi('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async googleOAuth(idToken: string): Promise<AuthResponse> {
    return this.fetchApi('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    });
  }

  async googleOAuthWithAccessToken(accessToken: string): Promise<AuthResponse> {
    return this.fetchApi('/auth/google/access-token', {
      method: 'POST',
      body: JSON.stringify({ access_token: accessToken }),
    });
  }

  async appleOAuth(idToken: string, user?: { email?: string; name?: { firstName?: string; lastName?: string } }): Promise<AuthResponse> {
    return this.fetchApi('/auth/apple', {
      method: 'POST',
      body: JSON.stringify({ 
        id_token: idToken,
        user: user || null
      }),
    });
  }

  // ==================== PROMPT ENHANCE ====================

  async enhancePrompt(prompt: string): Promise<PromptEnhanceResponse> {
    return this.fetchApi('/prompt/enhance', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  async assistantRecommend(message: string, results?: any[], listingContext?: any): Promise<AssistantResponse> {
    return this.fetchApi('/assistant/recommend', {
      method: 'POST',
      body: JSON.stringify({ 
        message, 
        results: results || [],
        listing_context: listingContext || null
      }),
    });
  }

  // ==================== TRANSCRIBE ====================

  async transcribeAudio(audioFile: File): Promise<TranscribeResponse> {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const url = `${API_BASE_URL}/transcribe`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const api = new ApiService();

// Export for use in components
export default api;

