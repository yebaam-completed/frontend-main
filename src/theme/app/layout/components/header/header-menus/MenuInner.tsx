import { useIntl } from "react-intl";
import { MenuItem } from "./MenuItem";

export function MenuInner() {
  const intl = useIntl();
  return (
    <>
      <MenuItem
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        to="/dashboard"
      />
      <MenuItem title="Ingreso" to="/ingress" />
      <MenuItem title="Egreso" to="/income" />
      <MenuItem title="Targetas" to="/cards" />
      <MenuItem title="Dispersion USDT" to="/usdt-dispersion" />
    </>
  );
}
