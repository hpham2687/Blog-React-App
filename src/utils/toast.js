import { toast, Icon } from "@ahaui/react";

const notifyNegative = ({ title = "Notification", message }) =>
  toast.error(
    () => (
      <div className="u-flex u-flexGrow1">
        <div className="u-marginRightExtraSmall">
          <Icon name="alert" size="medium" />
        </div>
        <div className="u-flexGrow1">
          <div className="u-fontMedium u-marginBottomExtraSmall">{title}</div>
          <div data-testid="toast-alert">{message}</div>
        </div>
      </div>
    ),
    {}
  );

const notifyPositive = ({ title = "Notification", message }) =>
  toast.info(
    () => (
      <div className="u-flex u-flexGrow1">
        <div className="u-marginRightExtraSmall">
          <Icon name="informationCircle" size="medium" />
        </div>
        <div className="u-flexGrow1">
          <div className="u-fontMedium u-marginBottomExtraSmall">{title}</div>
          <div data-testid="toast-alert">{message}</div>
        </div>
      </div>
    ),
    {}
  );
export { notifyNegative, notifyPositive };
