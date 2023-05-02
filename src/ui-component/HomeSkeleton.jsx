import React from "react";

import { Card, CardContent, Grid, Skeleton } from "@mui/material";



function HomeSkeleton() {


  return (
    <div className="">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={4}>
          <Card className="">
            <CardContent>
              <Skeleton
                variant="rect"
                width="100%"
                height={200}
                animation="wave"
              />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="">
            <CardContent>
              <Skeleton
                variant="rect"
                width="100%"
                height={200}
                animation="wave"
              />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="">
            <CardContent>
              <Skeleton
                variant="rect"
                width="100%"
                height={200}
                animation="wave"
              />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeSkeleton;
