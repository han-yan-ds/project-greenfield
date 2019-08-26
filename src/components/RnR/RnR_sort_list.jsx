import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import List from './RnR_list';
import updateReviewsToRender from '../../actions/RnR-Actions/RnR-action';
import '../../styles/standard-styles.scss';
import '../../styles/RnR-styles.scss';

const mapStateToProps = (state) => ({
  ...state,
});

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'relevance',
    };
  }

  componentDidMount() {
    this.getAllReviews();
  }

  getAllReviews() {
    const { currentView } = this.state;
    const { productId, dispatch } = this.props;
    const listData = fetch(`http://18.217.220.129/reviews/${productId}/list`)
      .then((response) => {
        if (response.status !== 200) { console.log('problem'); }
        return response.json();
      });
    const metaData = fetch(`http://18.217.220.129/reviews/${productId}/meta`)
      .then((response) => {
        if (response.status !== 200) { console.log('problem'); }
        return response.json();
      });
    Promise.all([listData, metaData])
      .then((data) => {
        if (currentView === 'helpfulness') {
          return data[0].results.sort((a, b) => ((a.helpfulness < b.helpfulness) ? 1 : -1));
        } if (currentView === 'date') {
          return data[0].results.sort((a, b) => ((a.date < b.date) ? 1 : -1));
        }
        return data[0].results.sort((a, b) => {
          if (a.helpfulness > 4 || b.helpfulness > 4) {
            return 1;
          }
          if (new Date().getTime() - Date.parse(a.date) < 6048000000
          || new Date().getTime() - Date.parse(b.date) < 6048000000) {
            return 1;
          }
          return (a.date < b.date) ? 1 : -1;
        });
      })
      .then((info) => { dispatch(updateReviewsToRender(info)); });
  }

  handleTypeChange(event) {
    this.setState({ currentView: event.target.value });
    this.getAllReviews();
  }

  render() {
    const { currentView } = this.state;
    return (
      <div>
        <h3 className="sort">Sort for lists</h3>
        <form>
          <select className="selector" value={currentView} onChange={this.handleTypeChange.bind(this)}>
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="helpfulness">Helpfulness</option>
          </select>
        </form>
        <List />
      </div>
    );
  }
}

Sort.propTypes = {
  productId: PT.number.isRequired,
  dispatch: PT.func.isRequired,
};

const connectSort = connect(mapStateToProps, null)(Sort);
export default connectSort;