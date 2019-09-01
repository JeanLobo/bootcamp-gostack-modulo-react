import React, { Component } from "react";
import TechItem from "./TechItem";
class TechList extends Component {
  state = {
    newTech: "",
    techs: []
    //techs: ["Node.js", "ReactJS", "React Native"]
  };

  // # Ínicio do Ciclo de Vida dos Componentes

  // Executado assim que o componente aparece na tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executado sempre que houver alterações nas props ou estado => componentDidUpdate(prevProps, prevState)
  // Essa ideia pode ser utilizada para armazenar temporariamente os dados que o usuário preencheu em um formulário para não perder caso a internet ou o serviço do backend para de funcionar
  componentDidUpdate(_, prevState) {
    // this.props, this.state
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  // Executado quando o componente deixa de existir
  componentWillUnmount() {}

  // # Fim do Ciclo de Vida dos Componentes

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    //console.log(this.state);
    return (
      //A tag <> é um fragment
      //<>
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
      //</>
    );
  }
}

export default TechList;
