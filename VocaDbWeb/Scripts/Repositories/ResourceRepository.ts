import ResourcesContract from '@DataContracts/ResourcesContract';
import functions from '@Shared/GlobalFunctions';
import HttpClient from '@Shared/HttpClient';

import RepositoryParams from './RepositoryParams';

export default class ResourceRepository {
	public constructor(
		private readonly httpClient: HttpClient,
		private baseUrl: string,
	) {}

	public getList = ({
		baseUrl,
		cultureCode,
		setNames,
	}: RepositoryParams & {
		cultureCode: string;
		setNames: string[];
	}): Promise<ResourcesContract> => {
		var url = functions.mergeUrls(
			this.baseUrl,
			`/api/resources/${cultureCode}/`,
		);
		return this.httpClient.get<ResourcesContract>(url, { setNames: setNames });
	};
}
