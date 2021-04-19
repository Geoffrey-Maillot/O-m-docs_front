import { connect } from 'react-redux';
import Table from 'src/components/ProductPage/ProductPageTable';
import {} from 'src/actions/utils';

const mapStateToProps = (state) => ({
  productResultsData: state.search.searchPharmacyResult,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Table);