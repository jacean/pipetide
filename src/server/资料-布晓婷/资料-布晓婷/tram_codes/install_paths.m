function install_paths()
%THE SCRIPT to install the paths to matlab system

fp = mfilename('fullpath');
rootdir = fileparts(fp);

subfolders = { ...
    'graph'; ...
    'evaluation'; ...
    'utils'};

n = length(subfolders);
folderpaths = cell(1, n);

for i = 1 : n
    folderpaths{i} = fullfile(rootdir, subfolders{i});
    fprintf('Add path: %s\n', folderpaths{i});    
end

addpath(folderpaths{:});
savepath;

disp('All paths have been added.');
disp(' ');  % a blank line



