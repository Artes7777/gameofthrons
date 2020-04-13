import React, { useState } from 'react';
import data from './data.json';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const ListOfDeth = () => {
 
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const localization = {
    header: {
      actions: 'Действие',
    },
    body : {
      editRow: {
        deleteText: 'Удалить этого персонажа?'
      },
      editTooltip: 'Исправить',
      addTooltip: 'Добавить',
      deleteTooltip: 'Удалить'
    },
    toolbar: {
      searchTooltip: 'Поиск',
      searchPlaceholder: 'Поиск'
    },
    pagination: {
      labelRowsSelect: 'персонажей',
      firstTooltip: 'Первая страница',
      lastTooltip: 'Последняя страница',
      previousTooltip: 'Предыдущая страница',
      nextTooltip: 'Следующая страница',
      labelDisplayedRows: '{from}-{to} из {count}'
    }
  }

  const [state, setState] = useState(data);
  const [stateColums] = useState( {columns: [
    { title: 'Имя персонажа', field: 'name' },
    { title: 'Описание персонажа', field: 'discription' },
    { title: 'Причина смерти', field: 'causeOfDeath' },
    { title: 'Кем убит', field: 'killer'},
    { title: 'Орудие убийства', field: 'murderWeapon'}
  ] })

  return (
    <div>
      <MaterialTable
      icons = {tableIcons}
      localization={localization}
      title="Список погибших героев игры престолов"
      columns={stateColums.columns}
      data={state.heroes}
      editable={{
        onRowAdd: (newData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            setState((prevState) => {
              const heroes = [...prevState.heroes];
              heroes.push(newData);
              return { ...prevState, heroes };
            });
          }, 600);
        }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const heroes = [...prevState.heroes];
                  heroes[heroes.indexOf(oldData)] = newData;
                  return { ...prevState, heroes };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const heroes = [...prevState.heroes];
                heroes.splice(heroes.indexOf(oldData), 1);
                return { ...prevState, heroes };
              });
            }, 600);
          }),
      }}
    />
    </div>
  );
}

export default ListOfDeth;
