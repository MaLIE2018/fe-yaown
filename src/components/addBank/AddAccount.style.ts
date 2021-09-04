import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAccount: {
      height: "90vh",
    },
    formControl: {
      width: "90%",
    },
  })
);

export default useStyles;
