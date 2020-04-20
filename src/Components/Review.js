import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = (theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(3)
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function valueLabelFormat(value) {
    const [coefficient, exponent] = value
        .toExponential()
        .split('e')
        .map((item) => Number(item));
    return `${Math.round(coefficient)}e^${exponent}`;
}


class Review extends Component {
    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <Box bgcolor="primary.main" display="flex" flex="1" minHeight="100vh" >
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Question
                        </Typography>
                        <Typography variant="body2" component="p">
                            Doing an enjoyable activity with a child can develop better skills and more creativity than reading. To what extent do you agree? Use reasons and specific examples to explain your answer.
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Answer
                        </Typography>
                        <Typography variant="body2" component="p">
                            Parents throughout the world place spend time reading with their offspring to prepare them for school where their literacy skills are further developed; however, recent research suggests that focusing on reading at an early age can be detrimental, and participating in fun activities would be far more beneficial. I am a strong advocate of this approach, and the benefits of it will be covered in this essay.
                            A fundamental reason for this is that there is no biological age for reading, and pushing infants to acquire this skill before they are ready could have repercussions. For example, in the UK, many boys are reluctant readers, possibly because of being forced to read, and this turned them off reading. By focusing on other activities and developing other skills such as creativity and imagination, when they are ready to read, they usually acquire this skill rapidly. In addition, the importance of encouraging creativity and developing a child’s imagination must be acknowledged. Through play, youngsters develop social and cognitive skills, for example, they are more likely to learn vocabulary through context rather than learning it from a book.

                            Furthermore, play allows youngsters to mature emotionally, and gain self-confidence. There is no scientific research which suggests reading at a young age is essential for a child’s development, moreover, evidence suggests the reverse is true. In Finland, early years’ education focuses on playing. Reading is only encouraged if a child shows and interest in developing this skill. This self-directed approach certainly does not result in Finnish school leavers falling behind their foreign counterparts. In fact, Finland was ranked the sixth best in the world in terms of reading.

                            Despite being a supporter of this non-reading approach, I strongly recommend incorporating bedtime stories into a child’s daily routine. However, reading as a regular daytime activity should be swapped for something which allows the child to develop other skills.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={valueLabelFormat}
                            aria-labelledby="discrete-slider-always"
                            step={1}
                            min={1}
                            max={9}
                            valueLabelDisplay="on"
                        />
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>

        )
    }
}

export default withStyles(useStyles)(Review);