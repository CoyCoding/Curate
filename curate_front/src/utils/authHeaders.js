  // Stored authHeaders most of the time I put these in its own file.
export const authHeaders = {
      headers: {
          "Authorization" : `Bearer ${localStorage.getItem('access-token')}`,
      }
  }