import api from './api';

const mockUsers = [
  { id: 1, name: 'Alice Admin', email: 'admin@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Eddie Editor', email: 'editor@example.com', role: 'editor', status: 'active' },
  { id: 3, name: 'Vera Viewer', email: 'viewer@example.com', role: 'viewer', status: 'inactive' },
  { id: 4, name: 'Sam Session', email: 'sam@example.com', role: 'editor', status: 'active' },
  { id: 5, name: 'Nina New', email: 'nina@example.com', role: 'viewer', status: 'pending' },
];

export const userService = {
  getUsers: async (params?: any) => {
    // For MVP, return mock data
    return Promise.resolve(mockUsers);
    // Future implementation:
    // return api.get('/users', { params }).then(res => res.data);
  },

  getUserById: async (id: number) => {
    // For MVP, return mock data
    return Promise.resolve(mockUsers.find(user => user.id === id));
    // Future implementation:
    // return api.get(`/users/${id}`).then(res => res.data);
  },

  createUser: async (userData: any) => {
    // For MVP, just return the new user
    const newUser = { ...userData, id: Date.now() };
    return Promise.resolve(newUser);
    // Future implementation:
    // return api.post('/users', userData).then(res => res.data);
  },

  // Additional methods can be added here...
}; 