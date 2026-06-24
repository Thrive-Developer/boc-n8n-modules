const assert = require('node:assert/strict');
const test = require('node:test');

const {
	buildAgentGetQuery,
	buildAlertSearchBody,
	buildCveSearchBody,
	buildIndexerSearchEndpoint,
	getResourceApiScope,
	normalizeWazuhCollection,
	normalizeWazuhSearch,
	parseCommaSeparatedList,
	parseJsonObjectParameter,
	validateCveId,
} = require('../dist/nodes/WazuhManager/GenericFunctions.js');

const mockExecuteContext = {
	getNode() {
		return {
			name: 'Wazuh',
			type: 'n8n-nodes-wazuh-boc.wazuhManager',
			typeVersion: 1,
			position: [0, 0],
			parameters: {},
		};
	},
};

test('parses comma-separated parameters', () => {
	assert.deepEqual(parseCommaSeparatedList('001, 002,,003 '), ['001', '002', '003']);
});

test('parses JSON object parameters', () => {
	assert.deepEqual(
		parseJsonObjectParameter.call(mockExecuteContext, '{"query":{"match_all":{}}}', 0, 'Query JSON'),
		{
			query: {
				match_all: {},
			},
		},
	);
	assert.throws(() =>
		parseJsonObjectParameter.call(mockExecuteContext, '["not-object"]', 0, 'Query JSON'),
	);
});

test('builds agent get query using agents_list', () => {
	assert.deepEqual(buildAgentGetQuery('001', 'id,name,status'), {
		agents_list: '001',
		select: 'id,name,status',
	});
});

test('builds CVE term query and validates format', () => {
	assert.deepEqual(buildCveSearchBody('cve-2020-14393', 25, 5), {
		query: {
			term: {
				'vulnerability.id': 'CVE-2020-14393',
			},
		},
		size: 25,
		from: 5,
	});
	assert.throws(() => validateCveId('2020-14393'));
});

test('builds alert query from common filters', () => {
	assert.deepEqual(
		buildAlertSearchBody(
			{
				agentId: '001',
				ruleId: '5710',
				minRuleLevel: 7,
				timestampFrom: 'now-24h',
				sortField: '@timestamp',
				sortOrder: 'desc',
			},
			10,
			0,
		),
		{
			query: {
				bool: {
					must: [],
					filter: [
						{
							term: {
								'agent.id': '001',
							},
						},
						{
							term: {
								'rule.id': '5710',
							},
						},
						{
							range: {
								'rule.level': {
									gte: 7,
								},
							},
						},
						{
							range: {
								'@timestamp': {
									gte: 'now-24h',
								},
							},
						},
					],
				},
			},
			size: 10,
			from: 0,
			sort: [
				{
					'@timestamp': {
						order: 'desc',
					},
				},
			],
		},
	);
});

test('routes resources to the expected API scope', () => {
	assert.equal(getResourceApiScope('agent'), 'manager');
	assert.equal(getResourceApiScope('decoder'), 'manager');
	assert.equal(getResourceApiScope('rule'), 'manager');
	assert.equal(getResourceApiScope('vulnerability'), 'indexer');
	assert.equal(getResourceApiScope('securityEvent'), 'indexer');
	assert.equal(getResourceApiScope('indexer'), 'indexer');
	assert.throws(() => getResourceApiScope('unsupported'));
});

test('builds safe indexer search endpoint', () => {
	assert.equal(buildIndexerSearchEndpoint('wazuh-alerts*'), '/wazuh-alerts*/_search');
	assert.throws(() => buildIndexerSearchEndpoint('https://example.com/_search'));
	assert.throws(() => buildIndexerSearchEndpoint('../_search'));
});

test('normalizes Wazuh API collections and indexer hits', () => {
	assert.deepEqual(
		normalizeWazuhCollection({
			data: {
				affected_items: [{ id: '001' }],
				total_affected_items: 1,
				total_failed_items: 0,
				failed_items: [],
			},
			message: 'ok',
			error: 0,
		}),
		{
			items: [{ id: '001' }],
			total: 1,
			totalFailed: 0,
			failedItems: [],
			message: 'ok',
			error: 0,
		},
	);
	assert.deepEqual(
		normalizeWazuhSearch({
			took: 2,
			timed_out: false,
			_shards: { total: 1 },
			hits: {
				total: {
					value: 1,
					relation: 'eq',
				},
				hits: [
					{
						_index: 'wazuh-alerts-4.x',
						_id: 'abc',
						_score: 1,
						_source: { rule: { id: '5710' } },
					},
				],
			},
		}),
		{
			items: [
				{
					index: 'wazuh-alerts-4.x',
					id: 'abc',
					score: 1,
					source: { rule: { id: '5710' } },
					fields: undefined,
					sort: undefined,
				},
			],
			total: 1,
			relation: 'eq',
			took: 2,
			timedOut: false,
			shards: { total: 1 },
		},
	);
});
