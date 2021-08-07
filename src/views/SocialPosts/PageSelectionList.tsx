import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FacebookPage, {
  FacebookPageResponse
} from '../../api/model/facebookPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto'
    },
    cardHeader: {
      padding: theme.spacing(1, 2)
    },
    list: {
      padding: theme.spacing(5),
      width: 300,
      height: 230,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto'
    },
    button: {
      margin: theme.spacing(0.5, 0)
    }
  })
);

function not(a: FacebookPage[], b: FacebookPage[]) {
  return a.filter(
    (value: FacebookPage) =>
      b.findIndex((item: FacebookPage) => value.id === item.id) === -1
  );
}

function intersection(a: FacebookPage[], b: FacebookPage[]) {
  return a.filter(
    (value: FacebookPage) =>
      b.findIndex((item: FacebookPage) => item.id === value.id) !== -1
  );
}

function union(a: FacebookPage[], b: FacebookPage[]) {
  return [...a, ...not(b, a)];
}

interface PageSelectionListProps {
  formik: any;
  setLeft: (data: FacebookPage[]) => void;
  left: FacebookPage[];
  setRight: (data: FacebookPage[]) => void;
  right: FacebookPage[];
}
export default function PageSelectionList(props: PageSelectionListProps) {
  const classes = useStyles();
  const { left, setLeft, right, setRight } = props;

  const [checked, setChecked] = React.useState<FacebookPage[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: FacebookPage) => () => {
    const currentIndex = checked.findIndex((item) => item.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const stringOfChecked = (items: FacebookPage[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: FacebookPage[]) => () => {
    if (stringOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: FacebookPage[]) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              stringOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              stringOfChecked(items) !== items.length &&
              stringOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${stringOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: FacebookPage) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} alignItems="center" className={classes.root}>
      <Grid item>{customList('Available Pages', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selected Pages', right)}</Grid>
    </Grid>
  );
}
