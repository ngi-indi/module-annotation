module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/frasi-da-classificares/not-related-to-user',
        handler: 'frasi-da-classificare.NotRelatedToUser',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/frasi-da-classificares/update-json-frasi',
        handler: 'frasi-da-classificare.UpdateJsonFrasi',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/frasi-da-classificares/update-testo-frasi',
        handler: 'frasi-da-classificare.UpdateTestoFrasi',
        config: {
          policies: [],
          middlewares: [],
        },

      }
    ],
  };