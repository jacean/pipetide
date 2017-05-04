function nnidx = slnngraph1(X, X2, nnparams, varargin)
%% parse input

if nargin < 3
    raise_lackinput('slnngraph', 3);
end

if ~isnumeric(X) || ndims(X) ~= 2 
    error('sltoolbox:invalidarg', ...
        'X should be a 2D numeric matrix');
end

if isempty(X2)
    X2 = [];
else
    if ~isnumeric(X2) || ndims(X2) ~= 2 
        error('sltoolbox:invalidarg', ...
            'A non-empty X2 should be a 2D numeric matrix');
    end
end
    
if ~iscell(nnparams)
    error('stoolbox:invalidarg', ...
        'The parameters for slfindnn should be groupped in a cell array');
end

opts.valtype = 'numeric';
opts.sparse = true;
opts.tfunctor = [];
opts.sym = false;
opts.symmethod = [];
opts = slparseprops(opts, varargin{:});

switch opts.valtype
    case 'logical'
        islogic = true;
    case 'numeric';
        islogic = false;
    otherwise
        error('sltoolbox:invalidarg', ...
            'Invalid value type for graph: %s', opts.valtype);
end


%% Main 

n0 = size(X, 2);
if isempty(X2)
    nq = n0;    
else
    nq = size(X2, 2);
end
can_sym = (n0 == nq);

% find nearest neighbor
if ~islogic
    [nnidx, dists] = slfindnn(X, X2, nnparams{:});
else
    nnidx = slfindnn(X, X2, nnparams{:});
end
