import React from "react";
//import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';

const EnhancedToolbar = (props) => {

  function addMenuItem(){
    //props.setPreviousPage(props.history.location.pathname);
    props.history.push('/Dashboard/Create')
  }

  return (
    <Toolbar className="toolbar-me">
          <Typography variant="h6" style={{marginRight: 'auto'}}id="tableTitle">
            Frequently Asked Questions
          </Typography>
          <div className="toolbar">
            Add new FAQ Post
            <Tooltip title="Add New FAQ">
                <IconButton onClick={addMenuItem} aria-label="filter list">
                    <AddIcon/>
                  </IconButton>
            </Tooltip>
          </div>
    </Toolbar>
  );
};

export default EnhancedToolbar;