import React from 'react';
// import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { NavLink } from 'react-router-dom';
// core components
import tableStyle from '../../assets/jss/material-dashboard-react/components/tableStyle';
import { IconButton, Tooltip } from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';

function CustomTable({ ...props }: any) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    hasLink,
    hasAction,
    supportedActions,
    onEditAction,
    onRemoveAction
  } = props;
  const filterData = (data: any) => {
    if (hasAction || hasLink) {
      return data.filter((p: any, k: any) => k !== 0);
    } else {
      return data;
    }
  };
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow>
              {tableHead.map((prop: any, key: any) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop: any, key: any) => {
            return (
              <TableRow key={key}>
                {filterData(prop).map((p: any, k: any) => {
                  return (
                    <TableCell className={classes.tableCell} key={k}>
                      {k === 0 && hasLink ? (
                        <NavLink to={prop[0][1]} key={key}>
                          {p}
                        </NavLink>
                      ) : (
                        p
                      )}
                    </TableCell>
                  );
                })}
                {hasAction && (
                  <TableCell className={classes.tableCell}>
                    {supportedActions.includes('EDIT') && (
                      <Tooltip
                        id="tooltip-top"
                        title="Edit"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label="Edit"
                          className={classes.tableActionButton}
                          onClick={() => onEditAction(prop[0][0])}
                        >
                          <Edit
                            className={
                              classes.tableActionButtonIcon + ' ' + classes.edit
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    )}

                    {props.supportedActions.includes('REMOVE') && (
                      <Tooltip
                        id="tooltip-top-start"
                        title={`Remove Item : ${prop[0][0]}`}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => onRemoveAction(prop[0][0])}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon +
                              ' ' +
                              classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

// CustomTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   tableHeaderColor: PropTypes.oneOf([
//     'warning',
//     'primary',
//     'danger',
//     'success',
//     'info',
//     'rose',
//     'gray'
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
// };

export default withStyles(tableStyle)(CustomTable);
