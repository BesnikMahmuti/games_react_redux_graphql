import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridGap: "1rem",
    padding: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
  },
  cardActionArea: {
    height: "93%",
  },
  image: {
    objectFit: "cover",
    objectPosition: "top",
  },
  pagination: {
    display: "grid",
    placeItems: "center",
    padding: "20px 0",
  },
});

const currentGamesPage = (offset) => {
  return {
    type: "LISTGAMES",
    payload: { offset },
  };
};

export default function ImgMediaCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let gamesData = useSelector((state) => state.games);
  console.log(gamesData);
  const { pagination: { total = 0 } = {}, games = [] } = gamesData || {};
  console.log({ games, total });

  return (
    <Fragment>
      <div className={classes.root}>
        {games &&
          games.map(
            ({ id, name, published_date, publisher = {}, banner_url }) => {
              const { name: publisherName = "" } = publisher;
              return (
                <Card key={id}>
                  <Fragment key={id} className="card_container">
                    <CardActionArea
                      className="clickableeee"
                      className={classes.cardActionArea}
                    >
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="500"
                        src={banner_url}
                        className={classes.image}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {publisherName}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Read More
                      </Button>
                    </CardActions>
                  </Fragment>
                </Card>
              );
            }
          )}
      </div>
      <div className={classes.pagination}>
        <Pagination
          count={total / 3}
          color="primary"
          onChange={(e, page) => {
            const offset = (page - 1) * 3;
            dispatch(currentGamesPage(offset));
          }}
        />
      </div>
    </Fragment>
  );
}
