import { t } from "../i18n.mjs";
import { registerGatewayCommand } from "../launch/command/gateway.mjs";

/**
 * Register `omniroute gateway status|keep|stop`: inspect or control the gateway that
 * `omniroute launch <tool>` started. The subcommands live with the launch core
 * (bin/cli/launch/command/gateway.mjs); this module only puts them on the omniroute program.
 *
 * @param {import("commander").Command} program  the root program
 * @param {{ deps?: object }} [options]  injectable effects for tests (see registerGatewayCommand)
 * @returns {import("commander").Command} the `gateway` command
 */
export function registerGateway(program, { deps = {} } = {}) {
  return registerGatewayCommand(program, { deps }).description(t("launch.gatewayDescription"));
}
