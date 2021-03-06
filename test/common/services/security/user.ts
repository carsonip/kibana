/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import axios, { AxiosInstance } from 'axios';
import util from 'util';
import { ToolingLog } from '@kbn/dev-utils';

export class User {
  private log: ToolingLog;
  private axios: AxiosInstance;

  constructor(url: string, log: ToolingLog) {
    this.log = log;
    this.axios = axios.create({
      headers: { 'kbn-xsrf': 'x-pack/ftr/services/security/user' },
      baseURL: url,
      maxRedirects: 0,
      validateStatus: () => true, // we do our own validation below and throw better error messages
    });
  }

  public async create(username: string, user: any) {
    this.log.debug(`creating user ${username}`);
    const { data, status, statusText } = await this.axios.post(
      `/internal/security/users/${username}`,
      {
        username,
        ...user,
      }
    );
    if (status !== 200) {
      throw new Error(
        `Expected status code of 200, received ${status} ${statusText}: ${util.inspect(data)}`
      );
    }
    this.log.debug(`created user ${username}`);
  }

  public async delete(username: string) {
    this.log.debug(`deleting user ${username}`);
    const { data, status, statusText } = await this.axios.delete(
      `/internal/security/users/${username}`
    );
    if (status !== 204) {
      throw new Error(
        `Expected status code of 204, received ${status} ${statusText}: ${util.inspect(data)}`
      );
    }
    this.log.debug(`deleted user ${username}`);
  }
}
