/**
 * @fileoverview
 * This file contains the implementation of the Accounts class that interacts with the TradeStation API.
 * It utilizes the OpenAPI specification version 3.0.3.
 *
 * @description
 * # Authentication
 * For more information on authorization and gaining an access/refresh token,
 * please visit: [Authentication](/docs/fundamentals/authentication/auth-overview).
 * <SecurityDefinitions />
 *
 * @version V3
 *
 * @termsOfService
 * [TradeStation API Guidelines for Acceptance](http://elasticbeanstalk-us-east-1-525856068889.s3.amazonaws.com/wp-content/uploads/2014/03/Guidelines_For_Acceptance.pdf)
 *
 * @contact
 * - Name: TradeStation API Team
 * - Email: ClientServices@tradestation.com
 * - URL: [TradeStation API Developer Portal](https://developer.tradestation.com/webapi)
 *
 * @license
 * - Name: Services Agreement For Application Developers
 * - URL: [Agreement for WebAPI Developers](https://s3.amazonaws.com/elasticbeanstalk-us-east-1-525856068889/wp-content/uploads/2016/02/Agreement-for-WebAPI-Developers_v5C.pdf)
 *
 * @server
 * - URL: https://api.tradestation.com
 */
import axios from 'axios';

export class Symbols {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'https://api.tradestation.com/v2/data/symbols';
  }

  /**
   * Suggests symbols semantically based upon partial input of symbol name,
   * company name, or description. Does not return Options symbols.
   * @param {string} text - Symbol text for suggestion. Partial input of a symbol name, company name, or description.
   * @param {number} [top] - The top number of results to return.
   * @param {string} [filter] - An OData filter to apply to the results.
   * @returns {Promise<SymbolSuggestDefinition>} - Promise resolving to the suggested symbols.
   */
  suggestSymbols(text, top, filter) {
    const url = `${this.baseUrl}/suggest/${text}`;
    const params = {
      $top: top,
      $filter: filter,
    };

    return axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  /**
   * Searches symbols based upon input criteria including Name, Category, and Country.
   * @param {string} criteria - Criteria represented as Key/value pairs (`&` separated).
   * @returns {Promise<SymbolSearchDefinition>} - Promise resolving to the symbol search response.
   */
  searchSymbols(criteria) {
    const url = `${this.baseUrl}/search/${criteria}`;

    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
