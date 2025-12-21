// API Health Check Utility
import api from '../services/api';

export const checkBackendHealth = async (): Promise<{
  isHealthy: boolean;
  message: string;
  geminiConfigured: boolean;
}> => {
  try {
    const health = await api.healthCheck();
    return {
      isHealthy: health.status === 'healthy',
      message: 'Backend is connected and running',
      geminiConfigured: health.gemini_configured,
    };
  } catch (error: any) {
    return {
      isHealthy: false,
      message: error.message || 'Failed to connect to backend',
      geminiConfigured: false,
    };
  }
};

export const testConversationalFlow = async () => {
  console.group('🧪 Testing Conversational Flow');
  
  try {
    // 1. Check health
    console.log('1️⃣ Checking backend health...');
    const health = await checkBackendHealth();
    console.log('Health:', health);
    
    if (!health.isHealthy) {
      console.error('❌ Backend is not healthy');
      return false;
    }
    
    // 2. Create chat
    console.log('2️⃣ Creating chat...');
    const chat = await api.createChat({
      user_id: 'test-user',
      title: 'Test Chat',
    });
    console.log('Chat created:', chat.chat.id);
    
    // 3. Send message
    console.log('3️⃣ Sending message...');
    const response = await api.conversationalSearch(
      chat.chat.id,
      'I want to visit Marrakech'
    );
    console.log('Response:', response);
    
    console.log('✅ All tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  } finally {
    console.groupEnd();
  }
};

export default checkBackendHealth;

