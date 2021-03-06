import React from "react";
import { Modal, Button, FormGroup, FormControl, Checkbox } from "react-bootstrap";
import ColumnType from "../../helpers/ColumnType";
import api from "../../api/spreadsheet";
import OptionsSelect from "./OptionsSelect";
import OptionsDropDown from "./OptionsDropDown";

class ColumnCreate extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showOptions: false
        };
        this._ref = {};
        this._ref.options = new Map();
    }

    handleShow = value => {
        this.setState({ show: value });
    };

    handleAdd = () => {
        api.addColumn({ name: this._ref.name.value, type: this._ref.type.value, required: this._ref.required.checked }, this._ref.options);
        this.setState({ show: false, showOptions: false });
    };
    handleColumnType = () => {
        this.setState({ showOptions: this._ref.type.value === ColumnType.select });
    };

    render() {
        return (
            <div>
                <Button onClick={() => this.handleShow(true)}>Add column</Button>
                <Modal show={this.state.show} onHide={() => this.handleShow(false)}>
                    <Modal.Body>
                        <FormGroup>
                            <FormControl type="text" placeholder="Enter column name" inputRef={el => (this._ref.name = el)} />
                            <Checkbox inputRef={el => (this._ref.required = el)}>Is required</Checkbox>
                            <OptionsDropDown handleColumnType={this.handleColumnType} handleRef={el => (this._ref.type = el)} />
                            <OptionsSelect handleRef={(el, index) => this._ref.options.set(index, el)} show={this.state.showOptions} />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAdd}>Add column</Button>
                        <Button onClick={() => this.handleShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ColumnCreate;
