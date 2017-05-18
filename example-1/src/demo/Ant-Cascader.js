import React,{Component} from 'react';
import {Select } from 'antd';
import GkCity from '../common/GkCity';
const Option = Select.Option;
const provinceData = GkCity.provinceData;
const cityData = GkCity.cityData;

export default class App extends Component {
  state = {
    province : provinceData[0],
    cities: cityData[provinceData[0]],
    city: cityData[provinceData[0]][0],
  }

  handleProvinceChange(value){
    this.setState({
      province : value,
      cities: cityData[value],
      city: cityData[value][0],
    });
  }

  onSecondCityChange(value){
    this.setState({
      city: value,
    });
  }

  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
      <div>
        <Select value={this.state.province} style={{ width: 90 }} onChange={(value)=>this.handleProvinceChange(value)}>
          {provinceOptions}
        </Select>
        <Select value={this.state.city} style={{ width: 90 }} onChange={(value)=>this.onSecondCityChange(value)}>
          {cityOptions}
        </Select>
      </div>
    );
  }
}