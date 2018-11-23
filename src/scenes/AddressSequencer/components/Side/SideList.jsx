import React, { Component } from "react";
import PropTypes from "prop-types";
import Sortable from "sortablejs";

export default class SideList extends Component {
  static propTypes = {
    items: PropTypes.array,
    changeAddrOrder: PropTypes.func,
    deleteAddress: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.list = React.createRef();
  }
  
  componentDidMount = () => {
    const { changeAddrOrder } = this.props;
    const el = this.list.current;
    Sortable.create(el, {
      animation: 200,
      onEnd: ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return ;
        changeAddrOrder(oldIndex, newIndex);
      },
    });
  };

  render() {
    const { items, deleteAddress } = this.props
    return (
      <ul id="items" ref={this.list} className="list">
        {
          items.map((item, index) => {
            return (
              <li key={item.id} className="list--item">
                {item.formatted_address}
                <i className="delete" onClick={() => deleteAddress(index)}></i>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
