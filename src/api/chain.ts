import {
  GetCurrencyStats,
  GetCurrencyBalance,
  GetTableRowsPayload,
} from "../interfaces/chain.interface";
import { ChannelPayload } from "../interfaces/channel.interface";

export default class RpcApi {
  readonly nodeos_url: string;
  readonly contract: string;
  readonly fetch: any;

  constructor(nodeos_url: string, contract: string, fetch: any) {
    this.nodeos_url = nodeos_url;
    this.contract = contract;
    this.fetch = fetch;
  }

  async getTableRows(payload: GetTableRowsPayload): Promise<any> {
    return await this.fetch(`${this.nodeos_url}/v1/chain/get_table_rows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  async getPrivateChannel(opts: ChannelPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.contract,
      scope: this.contract,
      table: "prvchannels",
      table_key: opts.channel,
      lower_bound: opts.channel,
      upper_bound: opts.channel,
      key_type: "name",
      index_position: "1",
    });
  }

  async getPrivateChannelByOwner(opts: ChannelPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.contract,
      scope: this.contract,
      table: "prvchannels",
      table_key: opts.owner,
      lower_bound: opts.owner,
      upper_bound: opts.owner,
      key_type: "name",
      index_position: "2",
    });
  }

  async getPrivateChannelByDescription(opts: ChannelPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.contract,
      scope: this.contract,
      table: "prvchannels",
      table_key: opts.description_sha256,
      lower_bound: opts.description_sha256,
      upper_bound: opts.description_sha256,
      key_type: "sha256",
      index_position: "3",
    });
  }

  async getPublicChannel(opts: ChannelPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.contract,
      scope: this.contract,
      table: "pubchannels",
      table_key: opts.channel,
      lower_bound: opts.channel,
      upper_bound: opts.channel,
      key_type: "name",
      index_position: "1",
    });
  }

  async getPublicChannelByOwner(opts: ChannelPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.contract,
      scope: this.contract,
      table: "pubchannels",
      table_key: opts.owner,
      lower_bound: opts.owner,
      upper_bound: opts.owner,
      key_type: "name",
      index_position: "2",
    });
  }

  async getPublicChannelByDescription(opts: ChannelPayload): Promise<any> {
    return this.getTableRows({
      json: true,
      code: this.contract,
      scope: this.contract,
      table: "pubchannels",
      table_key: opts.description_sha256,
      lower_bound: opts.description_sha256,
      upper_bound: opts.description_sha256,
      key_type: "sha256",
      index_position: "3",
    });
  }
}
