import /* actions */ 'src/actions/dataApi';

export const initialState = {
  nbOfArticles: 1,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
