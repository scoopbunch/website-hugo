import React, {useEffect, useState} from 'react';
import axios from "axios";
import {makeStyles} from "@material-ui/core";
import {Button, Card, Divider, Icon, Typography} from "antd";
import 'braft-editor/dist/output.css'

const {Paragraph, Title} = Typography;

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        maxWidth: 900,
        margin: 'auto',
        padding: `0 16px`,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        }
    },
}));


const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

const EventDetails = (props) => {
    const classes = useStyles();

    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const {history: {action}, match: {params}, location} = props;
        if (action === "PUSH") return setEvent(location.state);
        const {data} = await axios.get("/api/public/events");
        if (data.data) setEvent(data.data.filter(ev => ev.id === params.event)[0])
    }

    useEffect(() => {
        setLoading(true);
        fetchUrl().then(r => setLoading(false));
    }, []);

    return (
        <div className={classes.main}>
            <Card
                loading={loading}
                hoverable={true}
                style={{marginBottom: 8}}
                bodyStyle={{paddingTop: 16, paddingBottom: 16}}
            >
                {event && <>
                    <Title level={3} style={{marginBottom: 2}}>{event.title}</Title>
                    <IconText type="global" text={event.published_at}/><br/>
                    <Divider style={{margin: `12px 0`}}/>
                    <div style={{textAlign: 'center', marginBottom: `8px`}}>
                        <img
                            key={"image"}
                            width={120}
                            alt="logo"
                            src={event.image_thumb}
                        />
                    </div>

                    <Paragraph style={{textAlign: 'justify'}}>
                        <div dangerouslySetInnerHTML={{__html: event.content}}/>
                    </Paragraph>

                    <div style={{fontWeight: 500}}>
                        <Paragraph style={{marginBottom: 2}}>Venue: {event.venue}</Paragraph>
                        <Paragraph>Date: {event.date}</Paragraph>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <Button onClick={() => props.history.goBack()}>Back</Button>
                    </div>

                </>}

            </Card>

        </div>
    );
};

export default EventDetails;