import React from 'react'
import { Modal, Image } from 'semantic-ui-react'

export default (props) => {
  let actionDescriptions
  if (props.plan) {
    actionDescriptions = props.plan.goals.map(goal => goal.actions.map(action => action.description)).join('. ')
  }

    return (
      <Modal
          open={props.successModal}
          onClose={props.closeSuccessModal}
          >
          <Modal.Header>Congratulations!</Modal.Header>
          <Modal.Content>
            <h3>You've completed your plan to { props.plan ? props.plan.title : null } and have achieved your goal to { props.plan ? props.plan.description : null }. The steps you took to succeed were {actionDescriptions}.</h3>
          </Modal.Content>
          <Modal.Content image>
            <Image wrapped size='medium' src={props.gif} />
          </Modal.Content>
        </Modal>
    )
}
